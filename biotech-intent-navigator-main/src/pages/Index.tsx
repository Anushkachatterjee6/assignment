import { useState, useMemo } from 'react';
import { mockLeads } from '@/data/mockLeads';
import { FilterCriteria } from '@/types/lead';
import { Header } from '@/components/Header';
import { FilterPanel } from '@/components/FilterPanel';
import { LeadTable } from '@/components/LeadTable';
import { LeadCard } from '@/components/LeadCard';
import { StatsCard } from '@/components/StatsCard';
import { ArchitecturePanel } from '@/components/ArchitecturePanel';
import { ExportButton } from '@/components/ExportButton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Users, 
  TrendingUp, 
  Target, 
  Building2,
  LayoutGrid,
  TableIcon,
  Layers
} from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterCriteria>({
    titles: [],
    keywords: [],
    regions: [],
    scoreRange: [0, 100],
    fundingStages: [],
  });
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [showArchitecture, setShowArchitecture] = useState(false);

  const filteredLeads = useMemo(() => {
    return mockLeads.filter((lead) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          lead.name.toLowerCase().includes(query) ||
          lead.company.toLowerCase().includes(query) ||
          lead.title.toLowerCase().includes(query) ||
          lead.researchKeywords.some(k => k.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Score range
      if (lead.totalScore < filters.scoreRange[0] || lead.totalScore > filters.scoreRange[1]) {
        return false;
      }

      // Title filter
      if (filters.titles.length > 0) {
        const hasMatchingTitle = filters.titles.some(t => 
          lead.title.toLowerCase().includes(t.toLowerCase())
        );
        if (!hasMatchingTitle) return false;
      }

      // Keywords filter
      if (filters.keywords.length > 0) {
        const hasMatchingKeyword = filters.keywords.some(k =>
          lead.publicationTopics.some(t => t.toLowerCase().includes(k.toLowerCase())) ||
          lead.researchKeywords.some(r => r.toLowerCase().includes(k.toLowerCase()))
        );
        if (!hasMatchingKeyword) return false;
      }

      // Region filter
      if (filters.regions.length > 0) {
        const matchesRegion = filters.regions.some(r => {
          const region = r.toLowerCase();
          return lead.personLocation.toLowerCase().includes(region.split('/')[0]) ||
                 lead.companyHQ.toLowerCase().includes(region.split('/')[0]);
        });
        if (!matchesRegion) return false;
      }

      // Funding stage filter
      if (filters.fundingStages.length > 0) {
        if (!filters.fundingStages.includes(lead.fundingStage)) return false;
      }

      return true;
    });
  }, [mockLeads, searchQuery, filters]);

  const stats = useMemo(() => {
    const highIntent = filteredLeads.filter(l => l.totalScore >= 80).length;
    const avgScore = filteredLeads.length > 0 
      ? Math.round(filteredLeads.reduce((sum, l) => sum + l.totalScore, 0) / filteredLeads.length)
      : 0;
    const uniqueCompanies = new Set(filteredLeads.map(l => l.company)).size;
    const totalPubs = filteredLeads.reduce((sum, l) => sum + l.recentPublications, 0);

    return { highIntent, avgScore, uniqueCompanies, totalPubs };
  }, [filteredLeads]);

  return (
    <div className="min-h-screen bg-background bg-gradient-mesh">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
          <StatsCard 
            title="High-Intent Scientific Leads" 
            value={filteredLeads.length} 
            subtitle={`of ${mockLeads.length} total`}
            icon={Users}
          />
          <StatsCard 
            title="High Intent" 
            value={stats.highIntent} 
            subtitle="Score ≥ 80"
            icon={Target}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard 
            title="Avg Score" 
            value={stats.avgScore} 
            subtitle="Filtered leads"
            icon={TrendingUp}
          />
          <StatsCard 
            title="Companies" 
            value={stats.uniqueCompanies} 
            subtitle={`${stats.totalPubs} publications`}
            icon={Building2}
          />
        </div>

        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads, companies, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/30 border-border/50"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={showArchitecture ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowArchitecture(!showArchitecture)}
              className="gap-2"
            >
              <Layers className="h-4 w-4" />
              Architecture
            </Button>
            <ExportButton leads={filteredLeads} />
          </div>
        </div>

        {/* Architecture Panel (Collapsible) */}
        {showArchitecture && (
          <div className="animate-fade-in">
            <ArchitecturePanel />
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel 
              filters={filters} 
              onFiltersChange={setFilters} 
            />
          </div>

          {/* Leads Display */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="table" className="space-y-4">
              <TabsList className="bg-card/30 border border-border/50">
                <TabsTrigger value="table" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <TableIcon className="h-4 w-4" />
                  Table
                </TabsTrigger>
                <TabsTrigger value="cards" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <LayoutGrid className="h-4 w-4" />
                  Cards
                </TabsTrigger>
              </TabsList>

              <TabsContent value="table" className="mt-4 animate-fade-in">
                <LeadTable leads={filteredLeads} />
              </TabsContent>

              <TabsContent value="cards" className="mt-4 animate-fade-in">
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No leads match your current filters</p>
                    <p className="text-sm">Try adjusting your search criteria</p>
                  </div>
                ) : (
                  <div className="data-grid">
                    {filteredLeads.map((lead, idx) => (
                      <div 
                        key={lead.id} 
                        className="animate-fade-in"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <LeadCard
                          lead={lead}
                          isExpanded={expandedLeadId === lead.id}
                          onToggleExpand={() => setExpandedLeadId(
                            expandedLeadId === lead.id ? null : lead.id
                          )}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
