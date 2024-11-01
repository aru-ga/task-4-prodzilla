import { Request, Response } from 'express';
import Book from '../models/Book';

// Create a new book
export const createBook = async (req: Request, res: Response): Promise<void> => {
    const { title, author, publishedDate, isbn } = req.body;
    try {
        const newBook = new Book({ title, author, publishedDate, isbn });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

// Get all books
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

// Get a book by ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return; // Ensure no further execution
        }
        res.status(200).json(book);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

// Update a book by ID
export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            res.status(404).json({ message: 'Book not found' });
            return; // Ensure no further execution
        }
        res.status(200).json(updatedBook);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            res.status(404).json({ message: 'Book not found' });
            return; // Ensure no further execution
        }
        res.status(204).send(); // No content to send back
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};
