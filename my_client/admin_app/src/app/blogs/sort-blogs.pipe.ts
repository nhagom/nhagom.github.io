import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBlogs'
})
export class SortBlogsPipe implements PipeTransform {
  transform(blogs: any[],  sortOrder: string ): any[] {
    if (!blogs || !sortOrder) {
      return blogs;
    }

    let sortedBlogs = [...blogs];

    switch (sortOrder) {

      case 'name-asc':
        sortedBlogs.sort((a, b) => a.blogName.localeCompare(b.blogName));
        break;
      case 'name-desc':
        sortedBlogs.sort((a, b) => b.blogName.localeCompare(a.blogName));
        break;

      
      }
    return sortedBlogs;
  }
}

