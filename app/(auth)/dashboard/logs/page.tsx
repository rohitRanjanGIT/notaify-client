'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import {
    ArrowLeft,
    AlertCircle,
    CheckCircle2,
    Clock,
    Search,
    Cpu,
    BookOpenText,
    Bug,
    Wrench,
    Tag,
    Beaker
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ErrorLog {
    id: string;
    projectId: string;
    error: string;
    LLmType: string;
    llmApiModel: string;
    resolution: string;
    isTrial: boolean;
    timestamp: Date;
}

interface ParsedResolution {
    location?: string;
    reason?: string;
    solution?: string;
    statusCode?: string | number;
    errorType?: string;
}

export default function LogsPage() {
    const searchParams = useSearchParams();
    const projectId = searchParams.get('projectId');

    const [logs, setLogs] = useState<ErrorLog[]>([]);
    const [projectDesc, setProjectDesc] = useState<{ projectName: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTrial, setFilterTrial] = useState<string>('all'); // 'all', 'live', 'trial'

    useEffect(() => {
        if (!projectId) {
            setError('No project ID provided');
            setIsLoading(false);
            return;
        }

        const fetchLogs = async () => {
            try {
                const response = await fetch(`/api/project/logs?projectId=${projectId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch logs');
                }
                const data = await response.json();

                // Parse dates
                const parsedLogs = data.logs.map((log: ErrorLog) => ({
                    ...log,
                    timestamp: new Date(log.timestamp)
                }));

                setLogs(parsedLogs);
                setProjectDesc(data.project);
            } catch (err) {
                console.error(err);
                setError('Failed to load error logs from the server.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogs();
    }, [projectId]);

    const filteredLogs = logs.filter(log => {
        // Text Match
        const q = searchQuery.toLowerCase();
        const matchesQuery = log.error.toLowerCase().includes(q) ||
            (log.resolution && log.resolution.toLowerCase().includes(q));

        // Trial Filter
        const matchesTrial = filterTrial === 'all'
            ? true
            : filterTrial === 'trial' ? log.isTrial : !log.isTrial;

        return matchesQuery && matchesTrial;
    });

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    };

    const parseResolution = (jsonStr: string | null): ParsedResolution | null => {
        if (!jsonStr) return null;
        try {
            return JSON.parse(jsonStr);
        } catch {
            return null;
        }
    };

    return (
        <main className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-6xl space-y-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground hover:text-foreground">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                            <BookOpenText className="h-6 w-6 text-primary" />
                            Error Logs
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            {projectDesc ? `Viewing logs for project: ${projectDesc.projectName}` : 'View AI-analyzed errors from your application.'}
                        </p>
                    </div>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 bg-card p-3 rounded-lg border border-border">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search error messages or resolutions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-background"
                        />
                    </div>
                    <Select value={filterTrial} onValueChange={setFilterTrial}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-background">
                            <SelectValue placeholder="All Logs" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Logs</SelectItem>
                            <SelectItem value="live">Live Errors Only</SelectItem>
                            <SelectItem value="trial">Trial/Test Errors</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Rest of the Page: Cards & Tables */}
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                ) : logs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center bg-card">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-4">
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">No Errors Logged</h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Your project is running smoothly! No actual or trial errors have been captured for this project yet.
                        </p>
                    </div>
                ) : filteredLogs.length === 0 ? (
                    <div className="text-center py-12 bg-card rounded-lg border border-border">
                        <p className="text-muted-foreground">No logs found matching your filters.</p>
                        <Button variant="link" onClick={() => { setSearchQuery(''); setFilterTrial('all'); }}>
                            Clear Filters
                        </Button>
                    </div>
                ) : (
                    <div className="rounded-lg border border-border overflow-hidden bg-card">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[120px]">Time</TableHead>
                                    <TableHead>Error Message</TableHead>
                                    <TableHead className="w-[140px]">Type</TableHead>
                                    <TableHead className="w-[120px]">LLM Used</TableHead>
                                    <TableHead className="text-right w-[100px]">Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLogs.map(log => {
                                    const parsed = parseResolution(log.resolution);

                                    return (
                                        <TableRow key={log.id}>
                                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3" />
                                                    {formatDate(log.timestamp)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-[400px] truncate font-medium text-sm">
                                                    {log.error}
                                                </div>
                                                {parsed?.errorType && (
                                                    <span className="text-xs text-muted-foreground mt-1 inline-block">
                                                        Code: {parsed.statusCode || 'Unknown'} • Type: {parsed.errorType}
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {log.isTrial ? (
                                                    <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900 border font-normal">
                                                        <Beaker className="w-3 h-3 mr-1" />
                                                        Trial Test
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="destructive" className="font-normal">
                                                        <Bug className="w-3 h-3 mr-1" />
                                                        Live Error
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="font-mono text-xs font-normal capitalize">
                                                    <Cpu className="w-3 h-3 mr-1" />
                                                    {log.LLmType}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            View
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                                                        <DialogHeader>
                                                            <DialogTitle className="flex items-center gap-2">
                                                                <BookOpenText className="w-5 h-5 text-primary" />
                                                                Error Analysis
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                {log.isTrial ? 'This is a simulated trial error.' : 'Captured live error and its AI-generated resolution.'}
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        <div className="space-y-6 mt-4">
                                                            <div>
                                                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-red-500" /> Raw Error Trace</h4>
                                                                <div className="p-3 bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-200 rounded-md text-sm font-mono whitespace-pre-wrap border border-red-100 dark:border-red-900 max-h-[200px] overflow-y-auto">
                                                                    {log.error}
                                                                </div>
                                                            </div>

                                                            {parsed ? (
                                                                <div className="space-y-4">
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div className="p-3 bg-muted rounded-md border text-sm">
                                                                            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block mb-1">Status Code</span>
                                                                            {parsed.statusCode || 'N/A'}
                                                                        </div>
                                                                        <div className="p-3 bg-muted rounded-md border text-sm">
                                                                            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block mb-1">Error Type</span>
                                                                            {parsed.errorType || 'Unknown'}
                                                                        </div>
                                                                    </div>

                                                                    <div className="p-3 bg-muted/50 rounded-md border text-sm space-y-1">
                                                                        <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                                                                            <Tag className="w-3.5 h-3.5" /> Breakdown
                                                                        </span>
                                                                        <p><strong className="text-foreground">Location:</strong> {parsed.location}</p>
                                                                        <p className="mt-2"><strong className="text-foreground">Reason:</strong> {parsed.reason}</p>
                                                                    </div>

                                                                    <div className="p-4 bg-green-50 text-green-900 dark:bg-green-950/20 dark:text-green-100 border border-green-200 dark:border-green-900/50 rounded-md">
                                                                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5 text-green-700 dark:text-green-400">
                                                                            <Wrench className="w-4 h-4" /> Recommended Solution
                                                                        </h4>
                                                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{parsed.solution}</p>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <Alert>
                                                                    <AlertCircle className="h-4 w-4" />
                                                                    <AlertDescription>Resolution format invalid or empty: {log.resolution}</AlertDescription>
                                                                </Alert>
                                                            )}

                                                            <div className="text-xs text-muted-foreground text-center border-t border-border pt-4">
                                                                Generated by {log.LLmType} ({log.llmApiModel}) on {formatDate(log.timestamp)}
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </main>
    );
}
