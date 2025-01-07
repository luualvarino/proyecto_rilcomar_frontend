
import React from 'react';
import { DataView } from 'primereact/dataview';

interface DataviewProps {
    data : Object[];
    itemTemplate: (item: Object, index: number) =>  React.JSX.Element;
}

export default function Dataview({data, itemTemplate} : DataviewProps) {

    const listTemplate = () => {
        if (!data || data.length === 0) return null;

        let list = data.map((item, index) => {
            return itemTemplate(item, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            <DataView value={data} listTemplate={listTemplate} />
        </div>
    )
}
        