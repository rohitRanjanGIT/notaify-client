import { redirect } from 'next/navigation';

export default function NPMPage() {
    // Redirect to NPM package page
    redirect('https://www.npmjs.com/package/notaify');
}
