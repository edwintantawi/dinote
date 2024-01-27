import { AxiosError } from 'axios';

import { http } from '~/lib/http';

export class UserService {
  static async getProfile() {
    try {
      const response = await http('/users/me');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }
}

export class AuthenticationService {
  static async register({ name, email, password }) {
    try {
      const response = await http('/register', {
        method: 'POST',
        data: { name, email, password },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  static async login({ email, password }) {
    try {
      const response = await http('/login', {
        method: 'POST',
        data: { email, password },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }
}

export class NoteService {
  static async add({ title, body }) {
    try {
      const response = await http('/notes', {
        method: 'POST',
        data: { title, body },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  static async getActive() {
    try {
      const response = await http('/notes');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  static async getArchived() {
    try {
      const response = await http('/notes/archived');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  static async getById(id) {
    try {
      const response = await http(`/notes/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  static async archiveById(id) {
    try {
      const response = await http(`/notes/${id}/archive`, {
        method: 'POST',
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  static async unarchiveById(id) {
    try {
      const response = await http(`/notes/${id}/unarchive`, {
        method: 'POST',
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      const response = await http(`/notes/${id}`, {
        method: 'DELETE',
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }
}
