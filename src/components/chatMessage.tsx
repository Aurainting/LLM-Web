import React from 'react';
import ReactMarkdown from 'react-markdown'

export const UserMessage: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: 8,
            }}
        >
            <div
                style={{
                    backgroundColor: '#f0f0f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    borderRadius: 5,
                    padding: '8px 16px',
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                }}
            >
                {message}
            </div>
        </div>
    )
};

export const AssistantMessage: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                marginBottom: 8,
            }}
        >
            <div
                style={{
                    backgroundColor: '#e6f7ff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    borderRadius: 5,
                    padding: '8px 16px',
                    maxWidth: '85%',
                    wordWrap: 'break-word',
                }}
            >
                <ReactMarkdown>
                    {message}
                </ReactMarkdown>
            </div>
        </div>
    )
};
