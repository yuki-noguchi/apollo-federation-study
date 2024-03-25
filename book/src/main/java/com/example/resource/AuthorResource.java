package com.example.resource;

import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Id;
import org.eclipse.microprofile.graphql.Query;

import com.example.resource.Book.Author;

@GraphQLApi
public class AuthorResource {

	@Query
	public Author author(@Id String id) {
		return new Author(id, BookResource.books.stream().filter(book -> book.author().id().equals(id)).toList());
	}
}
