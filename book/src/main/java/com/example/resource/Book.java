package com.example.resource;

import java.util.List;

import org.eclipse.microprofile.graphql.Id;
import org.eclipse.microprofile.graphql.NonNull;

import io.smallrye.graphql.api.federation.Extends;
import io.smallrye.graphql.api.federation.External;
import io.smallrye.graphql.api.federation.Key;

@Key(fields = "id")
public record Book (
		@Id
		String id, //
		@NonNull
		String title,
		@NonNull
		Author author
		) {
	
	@Extends @Key(fields = "id")
	public static record Author(
			@Id @External
			String id, //
			List<Book> books
			) {
	}
}
