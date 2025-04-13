export interface User{
    id: string;
    email: string;
    username: string;
    name: {
        firstName: string,
        lastname: string
    }
}