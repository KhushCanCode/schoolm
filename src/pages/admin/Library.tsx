import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Book, BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Library = () => {
  const books = [
    { id: 1, title: "Mathematics Grade 10", author: "R.K. Sharma", isbn: "978-1234567890", status: "Available", borrowedBy: "" },
    { id: 2, title: "English Literature", author: "S. Patel", isbn: "978-1234567891", status: "Borrowed", borrowedBy: "Rahul Sharma (10A)" },
    { id: 3, title: "Science Fundamentals", author: "Dr. V. Singh", isbn: "978-1234567892", status: "Available", borrowedBy: "" },
    { id: 4, title: "History of India", author: "M. Gupta", isbn: "978-1234567893", status: "Borrowed", borrowedBy: "Priya Singh (10B)" },
    { id: 5, title: "Physics Grade 12", author: "A. Kumar", isbn: "978-1234567894", status: "Available", borrowedBy: "" },
  ];

  return (
    <div className="min-h-screen bg-background ">
      <div className=" w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-lg font-bold text-foreground">Library Management</h1>
            <p className=" text-xs text-muted-foreground mt-2">Manage library books and borrowing records</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/dashboard">
              <Button variant="outline" className="hover:bg-navbar hover:text-white">Back to Dashboard</Button>
            </Link>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="w-[250px]">
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Books</CardTitle>
            </CardHeader>
            <CardContent >
              <div className="flex items-center space-x-2  ml-14 ">
                <Book className="h-4 w-4 text-blue-600" />
                <div className="text-xl font-bold text-foreground">2,456</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Books Issued</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 ml-14 -my-4">
                <BookOpen className="h-4 w-4 text-green-600" />
                <div className="text-xl font-bold text-foreground">234</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 ml-14 -my-4">
                <Book className="h-4 w-4 text-purple-600" />
                <div className="text-xl font-bold text-foreground">2,222</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 ml-16 -my-4">
                <Clock className="h-4 w-4 text-red-600" />
                <div className="text-xl font-bold text-foreground">12</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Library Books</CardTitle>
              <div className="relative w-64">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input placeholder="Search books..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="overflow-hidden">
            <Table className="w-full ">
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Borrowed By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium text-xs">{book.title}</TableCell>
                    <TableCell className="text-xs">{book.author}</TableCell>
                    <TableCell className="text-xs">{book.isbn}</TableCell>
                    <TableCell className="text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.status === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {book.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{book.borrowedBy || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Library;