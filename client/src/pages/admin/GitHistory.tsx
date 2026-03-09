import { useState, useEffect } from "react";
import {
  Flex,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  DataList,
  DataListItem,
  DataListItemRow,
  DataListCell,
  DataListToggle,
  DataListContent,
  DataListItemCells,
  TextInput,
  Button,
  Alert,
  Bullseye,
  Spinner,
  ExpandableSection,
} from "@patternfly/react-core";
import { CodeBranchIcon, ClockIcon } from "@patternfly/react-icons";
import { api } from "../../lib/api";
import type { GitStatus, GitLogEntry, GitLogResult } from "../../types";

export default function GitHistory() {
  const [status, setStatus] = useState<GitStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logPath, setLogPath] = useState("");
  const [log, setLog] = useState<GitLogEntry[]>([]);
  const [logLoading, setLogLoading] = useState(false);
  const [expandedHash, setExpandedHash] = useState<string | null>(null);
  const [diff, setDiff] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<GitStatus>("/git/status")
      .then(setStatus)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load status")
      )
      .finally(() => setLoading(false));
  }, []);

  async function fetchLog() {
    if (!logPath.trim()) return;
    setLogLoading(true);
    try {
      const result = await api.get<GitLogResult>(`/git/log/${logPath}`);
      setLog(result.all ?? []);
    } catch {
      setLog([]);
    } finally {
      setLogLoading(false);
    }
  }

  async function fetchDiff(hash: string) {
    if (expandedHash === hash) {
      setExpandedHash(null);
      setDiff(null);
      return;
    }
    setExpandedHash(hash);
    try {
      const d = await api.get<string>(`/git/diff/${hash}`);
      setDiff(d);
    } catch {
      setDiff("Could not load diff");
    }
  }

  if (loading) {
    return (
      <Bullseye>
        <Spinner aria-label="Loading git status" />
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

  const isClean =
    status &&
    status.modified.length === 0 &&
    status.not_added.length === 0 &&
    status.staged.length === 0;

  return (
    <>
      {status && (
        <div className="pf-v6-u-mb-lg">
          <h3 className="pf-v6-u-mb-md">Working Directory Status</h3>
          {isClean ? (
            <p className="pf-v6-u-color-200 pf-v6-u-font-size-sm">
              Clean — no uncommitted changes
            </p>
          ) : (
            <DescriptionList isCompact isHorizontal>
              {status.modified.length > 0 && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Modified</DescriptionListTerm>
                  <DescriptionListDescription>
                    {status.modified.map((f) => (
                      <div
                        key={f}
                        className="pf-v6-u-font-family-monospace pf-v6-u-font-size-sm pf-v6-u-color-200"
                      >
                        M {f}
                      </div>
                    ))}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {status.not_added.length > 0 && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Not added</DescriptionListTerm>
                  <DescriptionListDescription>
                    {status.not_added.map((f) => (
                      <div
                        key={f}
                        className="pf-v6-u-font-family-monospace pf-v6-u-font-size-sm pf-v6-u-color-200"
                      >
                        ? {f}
                      </div>
                    ))}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {status.staged.length > 0 && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Staged</DescriptionListTerm>
                  <DescriptionListDescription>
                    {status.staged.map((f) => (
                      <div
                        key={f}
                        className="pf-v6-u-font-family-monospace pf-v6-u-font-size-sm pf-v6-u-color-200"
                      >
                        A {f}
                      </div>
                    ))}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
            </DescriptionList>
          )}
        </div>
      )}

      <div>
        <h3 className="pf-v6-u-mb-md">File History</h3>
        <Flex
          justifyContent={{ default: "justifyContentFlexStart" }}
          alignItems={{ default: "alignItemsCenter" }}
          gap={{ default: "gapMd" }}
          className="pf-v6-u-mb-lg"
        >
          <TextInput
            value={logPath}
            onChange={(_, v) => setLogPath(v)}
            placeholder="e.g. phases/00-discovery.md"
            aria-label="File path for log"
            style={{ fontFamily: "monospace", minWidth: 300 }}
          />
          <Button
            variant="primary"
            onClick={fetchLog}
            isDisabled={logLoading}
          >
            {logLoading ? "Loading..." : "Show Log"}
          </Button>
        </Flex>

        {log.length > 0 && (
          <DataList aria-label="Git log entries">
            {log.map((entry) => (
              <DataListItem
                key={entry.hash}
                aria-labelledby={`log-${entry.hash}`}
                isExpanded={expandedHash === entry.hash}
              >
                <DataListItemRow>
                  <DataListToggle
                    onClick={() => fetchDiff(entry.hash)}
                    isExpanded={expandedHash === entry.hash}
                    id={`toggle-${entry.hash}`}
                    aria-controls={`expand-${entry.hash}`}
                  />
                  <DataListItemCells
                    dataListCells={[
                      <DataListCell isIcon key="icon">
                        <CodeBranchIcon />
                      </DataListCell>,
                      <DataListCell key="hash">
                        <span
                          id={`log-${entry.hash}`}
                          className="pf-v6-u-font-family-monospace pf-v6-u-font-size-sm pf-v6-u-color-200"
                        >
                          {entry.hash.slice(0, 7)}
                        </span>
                      </DataListCell>,
                      <DataListCell key="message">
                        <span className="pf-v6-u-font-size-sm">
                          {entry.message}
                        </span>
                      </DataListCell>,
                      <DataListCell key="date">
                        <span className="pf-v6-u-font-size-sm pf-v6-u-color-200">
                          <ClockIcon className="pf-v6-u-mr-xs" />
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </DataListCell>,
                    ]}
                  />
                </DataListItemRow>
                <DataListContent
                  id={`expand-${entry.hash}`}
                  aria-label={`Diff for ${entry.hash}`}
                  isHidden={expandedHash !== entry.hash}
                >
                  {expandedHash === entry.hash && diff && (
                    <ExpandableSection
                      isExpanded
                      displaySize="lg"
                      contentId={`diff-${entry.hash}`}
                    >
                      <pre
                        className="pf-v6-u-font-family-monospace pf-v6-u-font-size-sm pf-v6-u-p-md"
                        style={{
                          backgroundColor: "var(--pf-v6-global--BackgroundColor--200)",
                          overflow: "auto",
                          maxHeight: 320,
                        }}
                      >
                        {diff}
                      </pre>
                    </ExpandableSection>
                  )}
                </DataListContent>
              </DataListItem>
            ))}
          </DataList>
        )}
      </div>
    </>
  );
}
