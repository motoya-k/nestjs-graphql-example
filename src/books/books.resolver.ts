import { NotFoundException } from '@nestjs/common';
import { Query, Int, Mutation, Args, Resolver } from '@nestjs/graphql';
import { Book } from './book';
import { BooksService } from './books.service';
import { NewBookInput } from './dto/newBook.input';

@Resolver((of) => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Query((returns) => [Book])
  async books(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Query((returns) => Book)
  book(@Args('id') id: number): Promise<Book> {
    const book = this.booksService.findOneById(id);
    if (!book) {
      throw new NotFoundException(id);
    }
    return book;
  }

  @Mutation((returns) => Book)
  addBook(@Args('newBook') newBook: NewBookInput): Promise<Book> {
    return this.booksService.create(newBook);
  }

  @Mutation((returns) => Boolean)
  removeBook(@Args('id') id: number) {
    return this.booksService.remove(id);
  }
}
