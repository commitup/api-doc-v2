import React, { useState, useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';

export default function ErrorCodesTable({ codes, labels }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { i18n } = useDocusaurusContext();
  const isDarkTheme = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark';

  const filteredCodes = useMemo(() => {
    const filtered = codes.filter(
      (c) =>
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.action.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Sort to put critical codes first
    return [...filtered].sort((a, b) => {
      if (a.isCritical && !b.isCritical) return -1;
      if (!a.isCritical && b.isCritical) return 1;
      return 0;
    });
  }, [codes, searchTerm]);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ marginBottom: '1rem', position: 'relative' }}>
        <input
          type="text"
          placeholder={labels.searchPlaceholder || "Search error codes..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid var(--ifm-toc-border-color)',
            backgroundColor: 'var(--ifm-background-color)',
            color: 'var(--ifm-font-color-base)',
            fontSize: '1rem',
            outline: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ifm-color-secondary)',
              fontSize: '1.2rem',
            }}
          >
            ×
          </button>
        )}
      </div>

      <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid var(--ifm-toc-border-color)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0 }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--ifm-color-emphasis-100)' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid var(--ifm-toc-border-color)', width: '50%' }}>{labels.code || "Code"}</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid var(--ifm-toc-border-color)', width: '50%' }}>{labels.action || "Action / Note"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredCodes.length > 0 ? (
              filteredCodes.map((c, i) => (
                <tr 
                  key={i} 
                  style={{ 
                    borderBottom: '1px solid var(--ifm-toc-border-color)',
                    backgroundColor: c.isCritical 
                      ? (isDarkTheme ? 'rgba(250, 60, 60, 0.1)' : 'rgba(250, 60, 60, 0.05)')
                      : (i % 2 === 0 ? 'transparent' : 'var(--ifm-color-emphasis-0)')
                  }}
                >
                  <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                    <div style={{ marginBottom: '4px' }}>
                      <code style={{ 
                        fontWeight: 'bold', 
                        color: c.isCritical ? 'var(--ifm-color-danger)' : 'var(--ifm-color-primary)', 
                        fontSize: '1rem' 
                      }}>
                        {c.code}
                      </code>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-700)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      {c.isCritical && (
                        <span style={{ 
                          fontSize: '0.7rem', 
                          backgroundColor: 'var(--ifm-color-danger)', 
                          color: 'white', 
                          padding: '1px 6px', 
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          whiteSpace: 'nowrap',
                          fontStyle: 'normal'
                        }}>
                          🚩 Critical
                        </span>
                      )}
                      <span>{c.description}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', verticalAlign: 'top', fontSize: '0.9rem', color: 'var(--ifm-color-secondary-darkest)' }}>
                    {c.action}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: 'var(--ifm-color-secondary)' }}>
                  {labels.noResults || "No matching error codes found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
