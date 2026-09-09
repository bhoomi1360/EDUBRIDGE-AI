import { SEEDED_OPPORTUNITIES } from '../data/opportunitiesData';

/**
 * Base Abstract Provider Interface
 */
class BaseJobProvider {
  async getOpportunities() {
    throw new Error('getOpportunities() must be implemented by subclass');
  }
  async getOpportunityById(id) {
    throw new Error('getOpportunityById() must be implemented by subclass');
  }
}

/**
 * Manual Job Provider (ACTIVE for current SIH prototype)
 * Serves manually curated real external opportunities with verifiable metadata.
 */
export class ManualJobProvider extends BaseJobProvider {
  constructor(initialData = SEEDED_OPPORTUNITIES) {
    super();
    this.opportunities = initialData;
  }

  async getOpportunities(filter = {}) {
    let result = [...this.opportunities];

    if (filter.type && filter.type !== 'ALL') {
      result = result.filter(opp => opp.type === filter.type);
    }

    if (filter.status) {
      result = result.filter(opp => opp.status === filter.status);
    }

    return result;
  }

  async getOpportunityById(id) {
    return this.opportunities.find(opp => opp.id === id) || null;
  }

  addOpportunity(newOpp) {
    const opportunityRecord = {
      id: `opp_manual_${Date.now()}`,
      title: newOpp.title,
      company: newOpp.company || 'Enterprise Partner',
      logo: newOpp.logo || '💼',
      type: newOpp.type || 'INTERNSHIP',
      location: newOpp.location || 'Remote',
      workMode: newOpp.workMode || 'REMOTE',
      stipend: newOpp.stipend || '₹40,000 / month',
      duration: newOpp.duration || '6 Months',
      skills: newOpp.skills || ['React', 'Python'],
      description: newOpp.description || 'Verified industrial placement opportunity.',
      source: 'COMPANY_WEBSITE',
      sourceUrl: newOpp.applyUrl || '#',
      applyUrl: newOpp.applyUrl || 'https://careers.google.com/',
      postedDate: new Date().toISOString().split('T')[0],
      lastVerifiedAt: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      isDemo: false
    };

    this.opportunities = [opportunityRecord, ...this.opportunities];
    return opportunityRecord;
  }

  deleteOpportunity(id) {
    this.opportunities = this.opportunities.filter(opp => opp.id !== id);
  }
}

/**
 * Future Adzuna API Provider Placeholder
 */
export class AdzunaProvider extends BaseJobProvider {
  async getOpportunities() {
    console.warn('AdzunaProvider is not active in this SIH build.');
    return [];
  }
}

/**
 * Future Employer Feed Provider Placeholder
 */
export class EmployerFeedProvider extends BaseJobProvider {
  async getOpportunities() {
    console.warn('EmployerFeedProvider is not active in this SIH build.');
    return [];
  }
}

// Active singleton instance for EduBridge AI
export const activeJobProvider = new ManualJobProvider();
