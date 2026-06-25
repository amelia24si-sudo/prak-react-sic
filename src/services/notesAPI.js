import supabase from '../lib/supabaseClient';

export const notesAPI = {
    async fetchNotes() {
        const { data, error } = await supabase
            .from('note')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return data;
    },

    async createNote(data) {
        const { data: newNote, error } = await supabase
            .from('note')
            .insert(data)
            .single();

        if (error) {
            throw error;
        }

        return newNote;
    },

    async deleteNote(id) {
        const { error } = await supabase
            .from('note')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        return true;
    },
};