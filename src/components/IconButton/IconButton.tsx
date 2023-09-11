import { IconButton as MaterialIconButton } from '@mui/material';

export const IconButton = ({ children, onClick }: { children: JSX.Element; onClick?: () => void }) => {
  return (
    <MaterialIconButton sx={{ ':hover': { backgroundColor: '#d38d61' }, height: 'fit-content' }} onClick={onClick}>
      {children}
    </MaterialIconButton>
  );
};
