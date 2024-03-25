package com.example.resource;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Id;
import org.eclipse.microprofile.graphql.Mutation;
import org.eclipse.microprofile.graphql.NonNull;
import org.eclipse.microprofile.graphql.Query;

import com.example.resource.Book.Author;

@GraphQLApi
public class BookResource {

	public static List<Book> books = new ArrayList<Book>() {

		private static final long serialVersionUID = 1L;

		{
			add(new Book("1", "ノルウェイの森", new Author("1", null)));
		}
	};

	@Query
	public List<Book> books() {
		return books;
	}

	@Query
	public Book book(@Id String id) {
		return books.stream().filter(book -> book.id().equals(id)).findFirst().get();
	}

	@Mutation
	public Book addBook(@NonNull String title, @NonNull @Id String authorId) {
		var newId = Integer.parseInt(books.getLast().id()) + 1;
		var newBook = new Book(String.valueOf(newId), title, new Author(authorId, null));

		books.add(newBook);

		return newBook;
	}
}
