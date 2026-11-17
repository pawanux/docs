import { useState, useEffect } from 'react';

export const EvaluationModels = () => {
  const SNAPSHOT = {
  "llm": [
    {
      "name": "anthropic",
      "models": [
        "claude-sonnet-4-6",
        "claude-3-sonnet-20240229",
        "claude-3-haiku-20240307"
      ]
    },
    {
      "name": "bedrock",
      "models": [
        "qwen.qwen3-vl-235b-a22b",
        "openai.gpt-oss-120b-1:0"
      ]
    },
    {
      "name": "Gemini",
      "models": [
        "gemini-2.5-pro",
        "gemini-2.5-flash-lite",
        "gemini-2.5-flash",
        "gemini-3-flash-preview",
        "gemini-3.1-pro-preview",
        "gemini-3.1-flash-lite-preview"
      ]
    },
    {
      "name": "llama",
      "models": [
        "llama-3-70b",
        "llama-3-1-8b",
        "llama-3-1-70b",
        "llama-3-1-405b"
      ]
    },
    {
      "name": "openai",
      "models": [
        "gpt-4o-mini",
        "gpt-5.4",
        "gpt-5.4-mini",
        "gpt-5.5",
        "gpt-5.6-terra"
      ]
    },
    {
      "name": "sarvam",
      "models": [
        "sarvam-105b",
        "sarvam-30b"
      ]
    },
    {
      "name": "cerebras",
      "models": [
        "zai-glm-4.6",
        "qwen-3-235b-a22b-instruct-2507",
        "gpt-oss-120b"
      ]
    }
  ],
  "transcription": [
    {
      "name": "cartesia",
      "models": [
        "ink-whisper"
      ]
    },
    {
      "name": "deepgram",
      "models": [
        "nova-2",
        "nova-2-general",
        "nova-2-meeting",
        "nova-2-phonecall",
        "nova-2-finance",
        "nova-2-conversationalai",
        "nova-2-video",
        "nova-2-medical",
        "nova-2-drivethru",
        "nova-2-automotive",
        "nova-2-legal",
        "nova-2-government",
        "nova-2-enterprise",
        "nova-3",
        "nova-3-general"
      ]
    },
    {
      "name": "elevenLabs",
      "models": [
        "scribe_v2_realtime"
      ]
    },
    {
      "name": "Gladia",
      "models": [
        "gladia"
      ]
    },
    {
      "name": "Grok",
      "models": [
        "grok"
      ]
    },
    {
      "name": "sarvam",
      "models": [
        "sarvam",
        "saaras:v3"
      ]
    },
    {
      "name": "smallest",
      "models": [
        "pulse"
      ]
    },
    {
      "name": "Soniox",
      "models": [
        "stt-rt-v4",
        "stt-rt-v5"
      ]
    }
  ]
};
  const [data, setData] = useState(SNAPSHOT);
  useEffect(() => {
    fetch('https://dev.tryunleashx.com/api/v1/global/evaluation/model-catalog')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && Array.isArray(d.llm) && Array.isArray(d.transcription)) setData(d);
      })
      .catch(() => {});
  }, []);

  const table = (rows) => (
    <table>
      <thead>
        <tr>
          <th>Provider</th>
          <th>Models</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((p) => (
          <tr key={p.name}>
            <td><code>{p.name}</code></td>
            <td>{p.models.map((m, i) => (<span key={m}><code>{m}</code>{i < p.models.length - 1 ? ', ' : ''}</span>))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2>Providers and models</h2>
      <p>Send the provider and model <strong>names</strong> exactly as written below (copy and paste). A model must belong to the provider you send with it. This list is loaded live, so new providers and models appear here automatically.</p>
      <h3>LLM</h3>
      <p>Use for <code>llm_provider</code> (provider) and <code>llm_model</code> (model). The same list works for <code>fallback_provider</code> and <code>fallback_model</code>.</p>
      {table(data.llm)}
      <h3>Transcription (recording source)</h3>
      <p>Use for <code>transcription_provider</code> (provider) and <code>transcription_model</code> (model).</p>
      {table(data.transcription)}
    </div>
  );
};
