import React, { useState } from 'react';
import { Button } from 'antd';

export const ToggleButton: React.FC<{
    id: string,
    content: string,
    onToggle: (id: string, value: boolean) => void
}> = ({ id, content, onToggle }) => {
    const [on, setOn] = useState(false);

    return (
        <Button
            id={id}
            style={{
                borderRadius: '20px',
                backgroundColor: on ? '#1890ff' : '#fff',
                color: on ? '#fff' : '#000',
            }}
            onClick={() => {
                const newStatus = !on;
                setOn(newStatus)
                onToggle(id, newStatus);
            }}
        >
            {content}
        </Button>
    );
};
