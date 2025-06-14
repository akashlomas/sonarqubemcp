#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";
import { Buffer } from "buffer";

// SonarQube API base URL (to be configured)
const SONARQUBE_URL: string = process.env.SONARQUBE_URL || "http://127.0.0.1:9000";
const SONARQUBE_TOKEN: string = process.env.SONARQUBE_TOKEN || "";

// Create a single MCP Server instance
const server = new McpServer({
    name: "SonarQube MCP Server",
    version: "1.0.0"
});

// Define SonarQube tools (same as before, potentially extracted or kept inline)
defineSonarQubeTools(server);

function defineSonarQubeTools(server: McpServer) {
    // Authenticate with SonarQube (token-based)
    console.log("[DEBUG] Registering tool: authenticate");
    server.tool(
        "authenticate",
        { token: z.string().optional() },
        async ({ token }: { token?: string }) => {
            try {
                const tokenToUse = token || SONARQUBE_TOKEN;
                const res = await axios.get(`${SONARQUBE_URL}/api/authentication/validate`, {
                    headers: { Authorization: `Basic ${Buffer.from(tokenToUse + ":").toString("base64")}` }
                });
                return { content: [{ type: "text", text: res.data.valid ? "Authenticated" : "Invalid token" }] };
            } catch (e: any) {
                return { content: [{ type: "text", text: `Authentication failed: ${e.message}` }] };
            }
        }
    );

    // List projects
    console.log("[DEBUG] Registering tool: list_projects");
    server.tool(
        "list_projects",
        { token: z.string().optional() },
        async ({ token }: { token?: string }) => {
            try {
                const tokenToUse = token || SONARQUBE_TOKEN;
                const res = await axios.get(`${SONARQUBE_URL}/api/projects/search`, {
                    headers: { Authorization: `Basic ${Buffer.from(tokenToUse + ":").toString("base64")}` }
                });
                return { content: [{ type: "text", text: JSON.stringify(res.data) }] };
            } catch (e: any) {
                return { content: [{ type: "text", text: `Failed to list projects: ${e.message}` }] };
            }
        }
    );

    // Fetch project details
    console.log("[DEBUG] Registering tool: get_project_details");
    server.tool(
        "get_project_details",
        { token: z.string().optional(), projectKey: z.string() },
        async ({ token, projectKey }: { token?: string; projectKey: string }) => {
            try {
                const tokenToUse = token || SONARQUBE_TOKEN;
                const res = await axios.get(`${SONARQUBE_URL}/api/projects/search?projects=${projectKey}`, {
                    headers: { Authorization: `Basic ${Buffer.from(tokenToUse + ":").toString("base64")}` }
                });
                return { content: [{ type: "text", text: JSON.stringify(res.data) }] };
            } catch (e: any) {
                return { content: [{ type: "text", text: `Failed to fetch project details: ${e.message}` }] };
            }
        }
    );

    // View metrics for a project
    console.log("[DEBUG] Registering tool: get_project_metrics");
    server.tool(
        "get_project_metrics",
        { token: z.string().optional(), projectKey: z.string(), metrics: z.string() },
        async ({ token, projectKey, metrics }: { token?: string; projectKey: string; metrics: string }) => {
            try {
                const tokenToUse = token || SONARQUBE_TOKEN;
                const res = await axios.get(`${SONARQUBE_URL}/api/measures/component?component=${projectKey}&metricKeys=${metrics}`, {
                    headers: { Authorization: `Basic ${Buffer.from(tokenToUse + ":").toString("base64")}` }
                });
                return { content: [{ type: "text", text: JSON.stringify(res.data) }] };
            } catch (e: any) {
                return { content: [{ type: "text", text: `Failed to fetch metrics: ${e.message}` }] };
            }
        }
    );

    // Add more SonarQube actions as needed...
}

// Run the server with stdio transport
async function runServer() {
    console.log("[INIT] Connecting SonarQube MCP server to stdio...");
    const transport = new StdioServerTransport();
    //defineSonarQubeTools(server);
    await server.connect(transport);
    console.log("[INIT] SonarQube MCP server running on stdio");
}

runServer().catch((error) => {
    console.error("[FATAL] SonarQube MCP server failed to start:", error);
    process.exit(1);
});