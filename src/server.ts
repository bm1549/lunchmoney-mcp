import { McpServer } from "@modelcontextprotocol/server";
import { registerUserTools } from "./tools/user.js";
import { registerCategoryTools } from "./tools/categories.js";
import { registerTagTools } from "./tools/tags.js";
import { registerTransactionTools } from "./tools/transactions.js";
import { registerRecurringItemsTools } from "./tools/recurring-items.js";
import { registerBudgetTools } from "./tools/budgets.js";
import { registerManualAccountTools } from "./tools/manual-accounts.js";
import { registerPlaidAccountTools } from "./tools/plaid-accounts.js";
import { registerCryptoTools } from "./tools/crypto.js";
import { registerBalanceHistoryTools } from "./tools/balance-history.js";
import { registerPrompts } from "./prompts.js";

/**
 * Build a configured `McpServer` with all LunchMoney tools and prompts registered.
 *
 * Before any tool is invoked, config from `./config` must be established:
 * `initializeConfig(token)` for single-tenant callers (stdio, one-user CLI),
 * or `runWithConfig(token, fn)` for multi-tenant hosts. The returned server is
 * wired up but inert — actual API calls go through that config, which throws
 * `"Configuration not initialized. Call initializeConfig() or runWithConfig()
 * first."` on the first tool invocation if neither has been established.
 *
 * @param version - Version string surfaced to MCP clients as `serverInfo.version`.
 */
export function createServer(version: string): McpServer {
    const server = new McpServer({
        name: "lunchmoney-mcp",
        version,
    });

    registerUserTools(server);
    registerCategoryTools(server);
    registerTagTools(server);
    registerTransactionTools(server);
    registerRecurringItemsTools(server);
    registerBudgetTools(server);
    registerManualAccountTools(server);
    registerPlaidAccountTools(server);
    registerCryptoTools(server);
    registerBalanceHistoryTools(server);
    registerPrompts(server);

    return server;
}
