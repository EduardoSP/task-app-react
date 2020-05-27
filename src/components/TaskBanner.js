import React from 'react';

export const TaskBanner = props => (
    <h4 className="bg-primary text-white text-center p4">
        {props.userName}'s Task app ({props.taskItems.filter(t => !t.done).length} task to do)
    </h4>
)