import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../lib/useAuth';
import styled from 'styled-components';

const Container = styled.div`
  margin: 160px 80px;
  text-align: center;
`;

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, signUp } = useAuth();

  const onSubmit = async event => {
    event.preventDefault();
    signUp(email, password);
  };

  return (
    <Container>
      <Box my={4}>
        <form onSubmit={onSubmit}>
          {error && <p>{error}</p>}
          <Typography variant='h4'>Sign Up</Typography>
          <Box pb={2.5} />
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='form-control'
            label='Email'
            required
          />
          <Box pb={2.5} />
          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
            className='form-control'
            label='Password'
            required
          />
          <Box pb={2.5} />
          <Button
            variant='contained'
            color='primary'
            size='large'
            type='submit'
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
}