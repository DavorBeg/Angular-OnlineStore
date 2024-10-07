export interface UserForAuthenticationDto
{
    username: string;
    password: string;
    expiresInMins: number;
}