// Governance UI with refined layout for Backstage-ready structure, always-expanded tree, fixed width, updated naming

import React, { useState } from 'react';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import { Box, Typography, Card, CardContent, Chip, Divider, Stack, Paper, Avatar, Grid } from '@mui/material';
import mockData from './mockWBSData.json';

const labelStyles = {
    "Strategic Objective": { letter: "SO", color: "#3949ab" },
    "Portfolio Epic": { letter: "PE", color: "#ff7043" },
    "Epic": { letter: "E", color: "#2196f3" },
    "Feature": { letter: "F", color: "#4caf50" },
    "Story": { letter: "S", color: "#009688" }
};

const collectNodeIds = (nodes, ids = []) => {
    if (!nodes) return ids;
    for (const node of nodes) {
        ids.push(String(node.id));
        if (node.children) {
            collectNodeIds(node.children, ids);
        }
    }
    return ids;
};

const WBSPanel = ({ node, onSelect }) => {
    const style = labelStyles[node.type] || { letter: node.type.slice(0, 2).toUpperCase(), color: "#8e24aa" };

    return (
        <TreeItem
            nodeId={String(node.id)}
            label={
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar
                        variant="square"
                        sx={{ bgcolor: style.color, width: 18, height: 18, fontSize: 9 }}
                    >
                        {style.letter}
                    </Avatar>
                    <Typography fontSize={11}>{node.summary}</Typography>
                </Stack>
            }
            onClick={() => onSelect(node)}
        >
            {node.children?.map((child) => (
                <WBSPanel key={child.id} node={child} onSelect={onSelect} />
            ))}
        </TreeItem>
    );
};

function App() {
    const [selected, setSelected] = useState(null);
    // const allNodeIds = collectNodeIds(mockData);

    return (
        <Box height="100vh" bgcolor="#f9f9f9" p={2}>
            <Grid container spacing={2} height="100%">
                {/* Tree View */}
                <Grid item sx={{ width: 280, overflowY: 'auto' }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        📂 WBS Tree
                    </Typography>
                    <TreeView
                        defaultExpanded={[]}
                        sx={{ fontSize: 13 }}
                    >
                        {mockData.map((item) => (
                            <WBSPanel key={item.id} node={item} onSelect={setSelected} />
                        ))}
                    </TreeView>
                </Grid>

                {/* Detail and Governance */}
                <Grid item xs>
                    {selected ? (
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            🔍 {selected.summary}
                                        </Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Stack spacing={1}>
                                            <Typography>Status: <Chip label={selected.status} color={selected.status === 'Done' ? 'success' : 'warning'} /></Typography>
                                            <Typography>Assignee: {selected.assignee}</Typography>
                                            {selected.gitlabRepo && <Typography>Repo: <Chip label={selected.gitlabRepo} variant="outlined" /></Typography>}
                                            {selected.pipelineStatus && (
                                                <Typography>Pipeline: <Chip label={selected.pipelineStatus} color="success" /></Typography>
                                            )}
                                            {selected.cr && <Typography>Change Request: <Chip label={selected.cr} color="primary" /></Typography>}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={6}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">✅ Governance</Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Stack spacing={2}>
                                            <Typography>Policy: <Chip label={selected.policy} color={selected.policy === 'allowed' ? 'success' : 'error'} /></Typography>
                                            <Typography variant="subtitle2">Controls:</Typography>
                                            {selected.controls?.map(ctrl => <Chip key={ctrl} label={ctrl} variant="outlined" />)}
                                            <Typography variant="subtitle2">Evidence:</Typography>
                                            {selected.evidence?.map(ev => <Typography key={ev}>• {ev}</Typography>)}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    ) : (
                        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', color: 'gray' }}>
                            <Typography>Select a node to view details</Typography>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default App;
