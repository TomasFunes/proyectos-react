type Content = {
    content: string
}

export default function Button (content: Content) {
    return (
        <button>{content.content}</button>
    );
}