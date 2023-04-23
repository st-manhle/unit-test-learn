import React from 'react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import UserList, { GET_USERS_API_ENDPOINT } from '../containers/UserList';
import { BrowserRouter } from 'react-router-dom';
import { DUMMY_USER } from './user-detail.test';

const server = setupServer(
  rest.get(GET_USERS_API_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json([DUMMY_USER] ));
  }),
);

describe('Users List Page', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  describe('Fetching Users', () => {
    test('Success!', async () => {
      render(<UserList />, { wrapper: BrowserRouter });
      expect(screen.getByText('Fetching Users')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId('users-list')).toBeInTheDocument();
      });
      expect(screen.getByText(`${DUMMY_USER.name}`)).toBeInTheDocument();
      expect(screen.queryByText('Fetching Users')).toBeNull();
    });

    test('Fetching Users Fail!', async () => {
      server.use(
        rest.get(GET_USERS_API_ENDPOINT, (req, res, ctx) => {
          return res(ctx.status(500));
        }),
      );
      render(<UserList />);
      expect(screen.getByText('Fetching Users')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      expect(screen.getByText('Opps! Something went wrong!')).toBeInTheDocument();
      expect(screen.getByText('Users Not Found')).toBeInTheDocument();
      expect(screen.queryByText('Fetching Users')).toBeNull();
    });
  });
  
  describe('Delete User', () => {
    test('Has remaining users', async () => {
      const FRIEND = { id: 2, name: 'Tommy Teo' };
      server.use(
        rest.get(GET_USERS_API_ENDPOINT, (req, res, ctx) => {
          return res(ctx.json([DUMMY_USER, FRIEND]));
        }),
      );
      render(<UserList />, { wrapper: BrowserRouter });
      expect(screen.getByText('Fetching Users')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId('users-list')).toBeInTheDocument();
      });
      expect(screen.getByText(`${DUMMY_USER.name}`)).toBeInTheDocument();
      expect(screen.queryByText('Fetching Users')).toBeNull();
      fireEvent.click(screen.queryAllByTestId('delete-btn')[0]);
      expect(screen.queryByText(`${DUMMY_USER.name}`)).toBeNull();
      expect(screen.getByText(`${FRIEND.name}`)).toBeInTheDocument();
      expect(screen.getByTestId('users-list')).toBeInTheDocument();
    });

    test('Has NOT remaining users', async () => {
      render(<UserList />, { wrapper: BrowserRouter });
      expect(screen.getByText('Fetching Users')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId('users-list')).toBeInTheDocument();
      });
      expect(screen.getByText(`${DUMMY_USER.name}`)).toBeInTheDocument();
      expect(screen.queryByText('Fetching Users')).toBeNull();

      fireEvent.click(screen.getByTestId('delete-btn'));
      expect(screen.getByText('Users Not Found')).toBeInTheDocument();
    });
  });
});
