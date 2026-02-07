# iExec Tooling Feedback

### Documentation for AI Agents
The current documentation at `https://docs.iex.ec/` is missing **`llm.txt`** and **`llms-full.txt`** standards. 

As most developers are now using AI-powered IDEs (Cursor, Windsurf) or CLI agents, having a dedicated LLM-friendly summary of the SDKs and TEE logic would significantly speed up integration and reduce the friction of learning the iExec-specific file systems and secret management.

### Tooling Feedback
- **DataProtector SDK:** The shift from v1 to v2 (Core/Sharing split) is a great architectural move, but TypeScript types for the `protectData` return objects remain occasionally inconsistent across beta versions.
- **iApp CLI:** The `iapp test` local Docker environment is incredibly helpful for TEE debugging. However, clearer error messages when the project root is not detected (or automated `.iapp` metadata creation) would improve the "first-mile" developer experience.
