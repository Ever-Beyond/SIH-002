import { EmptyState, Button } from '../../components';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <EmptyState 
        title="404 - Page Not Found" 
        description="The page you are looking for does not exist or has been moved." 
      />
      <div style={{ marginTop: '1.5rem' }}>
        <Button variant="primary" onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
