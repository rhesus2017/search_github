export interface CardData {
    id: number;
    full_name: string;
    description: string;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
}

export interface IssueData {
    number: number;
    created_at: string;
    title: string;
    html_url: string;
    repository_url: string;
    pull_request: object;
    labels: { name: string; color: string }[];
    user: { login: string };
  }

