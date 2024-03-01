export interface Coureur {
    id: number;
    name: string;
    description: string;
    age: number;
    active: boolean;
    birthdate: string;
    profileImageUrl: string;
    status: string;
    hobbies: string[];
    teamId: number; 
}

export interface Team {
    id: number;
    name: string;
    country: string;
}


