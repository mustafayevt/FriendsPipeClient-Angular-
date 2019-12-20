export class Post {
    id: number;
    content: string;
    user: string;
    postedDate: Date;
    comments: Comment[];
}
