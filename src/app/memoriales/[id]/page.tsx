import MemorialClient from './MemorialClient';

export function generateStaticParams() {
    return [
        { id: 'demo1' },
        { id: 'demo2' },
        { id: 'demo3' }
    ];
}

export default function MemorialPage() {
    return <MemorialClient />;
}
