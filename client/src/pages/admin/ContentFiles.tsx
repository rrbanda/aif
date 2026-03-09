import { useState, useEffect, useMemo } from "react";
import {
  Grid,
  GridItem,
  TreeView,
  type TreeViewDataItem,
  TextArea,
  Button,
  Alert,
  Bullseye,
  Spinner,
} from "@patternfly/react-core";
import SaveIcon from "@patternfly/react-icons/dist/esm/icons/save-icon";
import FolderIcon from "@patternfly/react-icons/dist/esm/icons/folder-icon";
import FileIcon from "@patternfly/react-icons/dist/esm/icons/file-icon";
import { api } from "../../lib/api";
import type { ContentNode } from "../../types";

function contentNodeToTreeViewDataItem(node: ContentNode): TreeViewDataItem {
  const isDir = node.type === "directory";
  return {
    id: node.path,
    name: node.name,
    children: isDir && node.children?.length
      ? node.children.map(contentNodeToTreeViewDataItem)
      : undefined,
    defaultExpanded: isDir,
    icon: isDir ? <FolderIcon /> : <FileIcon />,
  };
}

export default function ContentFiles() {
  const [tree, setTree] = useState<ContentNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "danger";
    text: string;
  } | null>(null);

  const treeData = useMemo(
    () => tree.map(contentNodeToTreeViewDataItem),
    [tree]
  );

  const activeItems = useMemo(() => {
    if (!selectedPath) return undefined;
    const findPath = (
      items: TreeViewDataItem[],
      path: string,
      acc: TreeViewDataItem[] = []
    ): TreeViewDataItem[] | null => {
      for (const item of items) {
        if (item.id === path) return [...acc, item];
        if (item.children) {
          const found = findPath(item.children, path, [...acc, item]);
          if (found) return found;
        }
      }
      return null;
    };
    return findPath(treeData, selectedPath) ?? undefined;
  }, [treeData, selectedPath]);

  useEffect(() => {
    api
      .get<ContentNode[]>("/content/tree")
      .then(setTree)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSelect(
    _event: React.MouseEvent,
    item: TreeViewDataItem
  ) {
    const path = item.id;
    if (!path || item.children) return;
    setSelectedPath(path);
    setSaveMessage(null);
    try {
      const text = await api.get<string>(`/content/${path}`);
      setContent(text);
    } catch (e) {
      setContent(
        `Error loading file: ${e instanceof Error ? e.message : "Unknown"}`
      );
    }
  }

  async function handleSave() {
    if (!selectedPath) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      await api.put(`/content/${selectedPath}`, { content });
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
        <Spinner aria-label="Loading content tree" />
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
    <Grid hasGutter>
      <GridItem span={4}>
        <TreeView
          data={treeData}
          activeItems={activeItems}
          onSelect={handleSelect}
          aria-label="Content file tree"
          hasGuides
        />
      </GridItem>
      <GridItem span={8}>
        {selectedPath ? (
          <>
            <div className="pf-v6-u-display-flex pf-v6-u-align-items-center pf-v6-u-mb-md">
              <span
                className="pf-v6-u-font-family-monospace pf-v6-u-font-size-sm pf-v6-u-color-200 pf-v6-u-mr-md"
                style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {selectedPath}
              </span>
              {saveMessage && (
                <Alert
                  variant={saveMessage.type}
                  isInline
                  title={saveMessage.text}
                  className="pf-v6-u-mr-md"
                />
              )}
              <Button
                variant="primary"
                icon={<SaveIcon />}
                onClick={handleSave}
                isDisabled={saving}
              >
                {saving ? "Saving..." : "Save & Commit"}
              </Button>
            </div>
            <TextArea
              value={content}
              onChange={(_, v) => setContent(v)}
              resizeOrientation="vertical"
              aria-label="File content"
              style={{ fontFamily: "monospace", fontSize: "0.875rem" }}
            />
          </>
        ) : (
          <Bullseye>
            <span className="pf-v6-u-color-200">
              Select a file from the tree to edit
            </span>
          </Bullseye>
        )}
      </GridItem>
    </Grid>
  );
}
