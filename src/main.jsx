import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return React.createElement('div', { style: { padding: 40, fontFamily: 'system-ui', textAlign: 'center' } },
        React.createElement('h1', { style: { color: '#e74c3c' } }, 'Something went wrong'),
        React.createElement('pre', { style: { background: '#f5f5f5', padding: 20, borderRadius: 12, textAlign: 'left', overflow: 'auto', maxWidth: 600, margin: '20px auto', fontSize: 13 } }, this.state.error.toString()),
        React.createElement('button', { onClick: () => { this.setState({ error: null }); window.location.reload(); }, style: { background: '#0071e3', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontSize: 15, marginTop: 16 } }, 'Reload')
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(ErrorBoundary, null, React.createElement(App))
)
