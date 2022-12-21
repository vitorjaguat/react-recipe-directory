import './Footer.css';
import { useTheme } from '../hooks/useTheme';

export default function Footer() {
  const { mode, color } = useTheme();
  return (
    <div style={{ background: color }} className={`footer ${mode}`}>
      <p>Jaguat 2022</p>
      <b>login</b>
      <small>topo</small>
    </div>
  );
}
