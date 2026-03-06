import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';

export default function ApiResponseSelector({ children, examples: propExamples }) {
  const [index, setIndex] = useState(0);

  // Helper to parse metastring if props are not directly available
  const parseMetastring = (metastring) => {
    if (!metastring) return {};
    const meta = {};
    // Handles key="value", key='value', and key=value
    const regex = /(\w+)=["']?([^"'\s]+)["']?/g;
    let match;
    while ((match = regex.exec(metastring)) !== null) {
      meta[match[1]] = match[2];
    }
    return meta;
  };

  let examples = [];

  if (propExamples) {
    // Prop-based (old way)
    examples = propExamples.map(ex => ({
      status: ex.status,
      title: ex.title,
      content: <CodeBlock language="json" title={ex.title}>{ex.code}</CodeBlock>
    }));
  } else if (children) {
    // Children-based (new way)
    const childrenArray = React.Children.toArray(children).filter(React.isValidElement);
    
    examples = childrenArray.map((child: any) => {
      // MDX2/Docusaurus often wraps code blocks or passes them with specific prop structures
      const props = child.props || {};
      const childrenProps = props.children?.props || {};
      
      // Merge props from both potential locations
      const mergedProps = { ...props, ...childrenProps };
      
      // Parse metastring if present (the part after ```json)
      const metastring = props.metastring || childrenProps.metastring || '';
      const meta = parseMetastring(metastring);
      
      return {
        status: (mergedProps as any).status || meta.status || '???',
        title: (mergedProps as any).title || meta.title || '',
        content: child
      };
    });
  }

  if (examples.length === 0) return null;
  if (index >= examples.length) setIndex(0);

  const current = examples[index];

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          right: '3.5rem',
          top: '0.55rem',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {examples.map((ex, i) => {
            let colorClass = 'badge--secondary';
            if (ex.status.includes('200')) colorClass = 'badge--success';
            else if (ex.status === '400') colorClass = 'badge--warning';
            else if (ex.status === '406') colorClass = 'badge--warning';
            else if (ex.status === '500') colorClass = 'badge--danger';

            return (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`badge ${index === i ? colorClass : 'badge--secondary'}`}
                style={{
                  fontSize: '0.8rem',
                  padding: '4px 12px',
                  cursor: 'pointer',
                  border: 'none',
                  opacity: index === i ? 1 : 0.6,
                  transition: 'opacity 0.2s',
                  fontWeight: 'bold',
                  borderRadius: '6px',
                  lineHeight: '1.2',
                }}
              >
                {ex.status}
              </button>
            );
          })}
        </div>
      </div>
      {current.content}
    </div>
  );
}
