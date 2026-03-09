import { useState, useEffect } from "react";
import {
  Flex,
  FlexItem,
  Button,
  Switch,
  TextArea,
  TextInput,
  Alert,
  Bullseye,
  Spinner,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
} from "@patternfly/react-core";
import SaveIcon from "@patternfly/react-icons/dist/esm/icons/save-icon";
import { api } from "../../lib/api";

const CONFIG_TYPES = [
  { id: "program", label: "Program" },
  { id: "phases", label: "Phases" },
  { id: "organization", label: "Organization" },
  { id: "use-cases", label: "Use Cases" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "roles", label: "Roles" },
  { id: "metrics", label: "Metrics" },
  { id: "navigation", label: "Navigation" },
] as const;

function setAtPath(obj: unknown, path: string, value: unknown): unknown {
  const copy = JSON.parse(JSON.stringify(obj));
  const parts = path.split(/\.|\[(\d+)\]/).filter(Boolean);
  let current: Record<string, unknown> = copy as Record<string, unknown>;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = /^\d+$/.test(parts[i]) ? parseInt(parts[i], 10) : parts[i];
    current = current[key as string] as Record<string, unknown>;
  }
  const lastKey = /^\d+$/.test(parts[parts.length - 1])
    ? parseInt(parts[parts.length - 1], 10)
    : parts[parts.length - 1];
  (current as Record<string | number, unknown>)[lastKey] = value;
  return copy;
}

interface YamlValueProps {
  label: string;
  value: unknown;
  path: string;
  onChange: (path: string, value: unknown) => void;
  depth?: number;
}

function YamlValue({
  label,
  value,
  path,
  onChange,
  depth = 0,
}: YamlValueProps) {
  const indent = depth * 16;

  if (value === null || value === undefined) {
    return (
      <DescriptionListGroup key={path}>
        <DescriptionListTerm style={{ paddingLeft: indent }}>{label}</DescriptionListTerm>
        <DescriptionListDescription>
          <span className="pf-v6-u-color-200 pf-v6-u-font-style-italic">null</span>
        </DescriptionListDescription>
      </DescriptionListGroup>
    );
  }

  if (Array.isArray(value)) {
    return (
      <DescriptionListGroup key={path}>
        <DescriptionListTerm style={{ paddingLeft: indent }}>{label}</DescriptionListTerm>
        <DescriptionListDescription>
          <div>
            {value.map((item, i) => (
              <YamlValue
                key={`${path}[${i}]`}
                label={
                  typeof item === "object" && item !== null && "id" in item
                    ? String((item as { id: unknown }).id)
                    : `[${i}]`
                }
                value={item}
                path={`${path}[${i}]`}
                onChange={onChange}
                depth={depth + 1}
              />
            ))}
          </div>
        </DescriptionListDescription>
      </DescriptionListGroup>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    return (
      <DescriptionListGroup key={path}>
        <DescriptionListTerm style={{ paddingLeft: indent }}>{label}</DescriptionListTerm>
        <DescriptionListDescription>
          <DescriptionList isCompact isHorizontal>
            {entries.map(([k, v]) => (
              <YamlValue
                key={k}
                label={k}
                value={v}
                path={`${path}.${k}`}
                onChange={onChange}
                depth={depth + 1}
              />
            ))}
          </DescriptionList>
        </DescriptionListDescription>
      </DescriptionListGroup>
    );
  }

  if (typeof value === "boolean") {
    return (
      <DescriptionListGroup key={path}>
        <DescriptionListTerm style={{ paddingLeft: indent }}>{label}</DescriptionListTerm>
        <DescriptionListDescription>
          <Switch
            isChecked={value}
            onChange={(_, checked) => onChange(path, checked)}
            aria-label={label}
          />
        </DescriptionListDescription>
      </DescriptionListGroup>
    );
  }

  const strValue = String(value);
  const isLong = strValue.length > 80;

  return (
    <DescriptionListGroup key={path}>
      <DescriptionListTerm style={{ paddingLeft: indent }}>{label}</DescriptionListTerm>
      <DescriptionListDescription>
        {isLong ? (
          <TextArea
            value={strValue}
            onChange={(_, v) => {
              const newVal =
                typeof value === "number" ? Number(v) : v;
              onChange(path, newVal);
            }}
            rows={3}
            aria-label={label}
            style={{ fontFamily: "monospace", fontSize: "0.75rem" }}
          />
        ) : (
          <TextInput
            value={strValue}
            onChange={(_, v) => {
              const newVal =
                typeof value === "number" ? Number(v) : v;
              onChange(path, newVal);
            }}
            type={typeof value === "number" ? "number" : "text"}
            aria-label={label}
            style={{ fontFamily: "monospace", fontSize: "0.75rem" }}
          />
        )}
      </DescriptionListDescription>
    </DescriptionListGroup>
  );
}

export default function ConfigEditor() {
  const [selectedType, setSelectedType] = useState<string>("program");
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawMode, setRawMode] = useState(false);
  const [rawContent, setRawContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "danger";
    text: string;
  } | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSaveMessage(null);

    if (rawMode) {
      api
        .get<string>(`/content/config/${selectedType}.yaml`)
        .then((text) => {
          setRawContent(text);
          setData(null);
        })
        .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
        .finally(() => setLoading(false));
    } else {
      api
        .get(`/config/${selectedType}`)
        .then(setData)
        .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
        .finally(() => setLoading(false));
    }
  }, [selectedType, rawMode]);

  function handleValueChange(path: string, newValue: unknown) {
    setData((prev: unknown) => setAtPath(prev, path, newValue) as unknown);
  }

  async function handleSaveRaw() {
    setSaving(true);
    setSaveMessage(null);
    try {
      await api.put(`/content/config/${selectedType}.yaml`, {
        content: rawContent,
      });
      setSaveMessage({ type: "success", text: "Saved and committed" });
    } catch (e) {
      setSaveMessage({
        type: "danger",
        text: `Error: ${e instanceof Error ? e.message : "Save failed"}`,
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Bullseye>
        <Spinner aria-label="Loading config" />
      </Bullseye>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" title="Error">
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Flex
        justifyContent={{ default: "justifyContentSpaceBetween" }}
        alignItems={{ default: "alignItemsCenter" }}
        flexWrap={{ default: "wrap" }}
        gap={{ default: "gapMd" }}
        className="pf-v6-u-mb-lg"
      >
        <FlexItem>
          <Flex gap={{ default: "gapSm" }} flexWrap={{ default: "wrap" }}>
            {CONFIG_TYPES.map((ct) => (
              <Button
                key={ct.id}
                variant={selectedType === ct.id ? "primary" : "secondary"}
                size="sm"
                onClick={() => setSelectedType(ct.id)}
              >
                {ct.label}
              </Button>
            ))}
          </Flex>
        </FlexItem>
        <FlexItem>
          <Flex gap={{ default: "gapMd" }} alignItems={{ default: "alignItemsCenter" }}>
            <Switch
              label={rawMode ? "Raw YAML" : "Form View"}
              isChecked={rawMode}
              onChange={(_, checked) => setRawMode(checked)}
              aria-label="Toggle form view or raw YAML"
            />
            {rawMode && (
              <>
                {saveMessage && (
                  <Alert
                    variant={saveMessage.type as "success" | "danger"}
                    isInline
                    title={saveMessage.text}
                  />
                )}
                <Button
                  variant="primary"
                  icon={<SaveIcon />}
                  onClick={handleSaveRaw}
                  isDisabled={saving}
                >
                  {saving ? "Saving..." : "Save & Commit"}
                </Button>
              </>
            )}
          </Flex>
        </FlexItem>
      </Flex>

      {rawMode ? (
        <TextArea
          value={rawContent}
          onChange={(_, v) => setRawContent(v)}
          aria-label="YAML content"
          style={{
            fontFamily: "monospace",
            fontSize: "0.75rem",
            minHeight: "calc(100vh - 300px)",
          }}
        />
      ) : data ? (
          <DescriptionList
          isCompact
          isHorizontal
          columnModifier={{ default: "2Col" }}
          className="pf-v6-u-max-height-screen-reader pf-v6-u-overflow-y-auto"
        >
          {Object.entries(data as Record<string, unknown>).map(([k, v]) => (
            <YamlValue
              key={k}
              label={k}
              value={v}
              path={k}
              onChange={handleValueChange}
            />
          ))}
        </DescriptionList>
      ) : null}
    </>
  );
}
