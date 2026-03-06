import React from 'react';

interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
}

export default function ApiEndpoint({ method, url }: ApiEndpointProps) {
  let colorVar = 'var(--ifm-color-emphasis-800)'; // Default fallback

  switch (method.toUpperCase()) {
    case 'GET':
      colorVar = 'var(--ifm-color-info)'; // Blue
      break;
    case 'POST':
      colorVar = 'var(--ifm-color-success)'; // Green
      break;
    case 'PUT':
    case 'PATCH':
      colorVar = 'var(--ifm-color-warning)'; // Yellow/Orange
      break;
    case 'DELETE':
      colorVar = 'var(--ifm-color-danger)'; // Red
      break;
  }

  return (
    <div
      style={{
        padding: '0.8rem',
        backgroundColor: 'var(--ifm-color-emphasis-100)',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '0.4rem',
        marginBottom: '1rem',
        fontFamily: 'var(--ifm-font-family-monospace)',
        fontSize: '0.9em',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
      <span
        style={{
          color: colorVar,
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}>
        {method}
      </span>
      <code>{url}</code>
    </div>
  );
}
