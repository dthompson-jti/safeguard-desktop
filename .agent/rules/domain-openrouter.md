---
trigger: openrouter_integration
---

# OpenRouter Integration Rules

Standard patterns for interacting with the OpenRouter API for image and text generation.

## 1. Request Configuration
*   **Referer Header**: Always include `'HTTP-Referer': window.location.origin` as required by OpenRouter.
*   **Model IDs**: Prefer canonical IDs (e.g., `google/gemini-2.5-flash-image`).
*   **Modalities**: For image generation, explicitly include `modalities: ["image"]` in the request body to ensure proper model routing.

## 2. Response Handling
*   **Images Array**: Modern image models return data in a `message.images` array. Always check this array before attempting to parse the `message.content` text.
*   **Base64 vs URL**: Handle both direct URLs and base64-encoded strings (often prefixed with `data:image/...`) within the images array.
*   **Finish Reason**: Always log or surface the `finish_reason` (e.g., `stop`, `content_filter`, `length`) to provide actionable feedback when responses are empty.

## 3. Storage & Defaults
*   **Persistence**: API keys and model selections should be persisted via `jotai/utils` `atomWithStorage`.
*   **Migrations**: When changing default models for stability, bump the storage key (e.g., `openrouter-model-v2`) to force-reset user preferences and ensure they land on the new standard.

## 4. Error Patterns
*   **Missing Content**: If both `content` and `images` are missing/empty, throw an error that includes the `finish_reason`.
*   **401 Unauthorized**: Typically indicates an invalid key format (e.g., `ysk-` vs `sk-` prefix) or a copy-paste error.
