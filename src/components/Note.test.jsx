import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Note from "./Note";
import { beforeEach, describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import Togglable from "./Togglable";
import NoteForm from "./NoteForm";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

describe("Blogs", () => {
  let container;
  beforeEach(() => {
    const blog = {
      title: "Multivariable calculus",
      author: "Rohit",
      content: "nice",
      url: "www.com",
    };
    container = render(<Blog blog={blog}></Blog>).container;
  });

  test("Displaying a blog", async () => {
    expect(screen.getByText("Multivariable calculus")).toBeDefined();
    expect(screen.getByText("Rohit")).toBeDefined();
  });
  test("Doesnt display content and url", async () => {
    const url = container.querySelector(".blog-url");
    const content = container.querySelector(".blog-content");
    expect(url).not.toBeVisible();
    expect(content).not.toBeVisible();
  });
  test("display content and url when show button is pressed", async () => {
    const user = userEvent.setup();
    const showButton = screen.getByText("Show Blog");
    await user.click(showButton);
    expect(screen.getByText("nice")).toBeInTheDocument();
  });
  test("You can like as many times as you want", async () => {
    cleanup();
    const mockLikeBlog = vi.fn();
    const blog = {
      title: "Multivariable calculus",
      author: "Rohit",
      content: "nice",
      url: "www.com",
    };
    container = render(
      <Blog blog={blog} likeBlog={mockLikeBlog} removeBlog={vi.fn()}></Blog>
    ).container;

    const user = userEvent.setup();
    const button = screen.getByText("Like");
    await user.click(button);
    expect(mockLikeBlog).toHaveBeenCalledTimes(1);
  });
  test("callback of form must ensure correct details of form", async () => {
    const createBlog = vi.fn();
    container = render(<BlogForm createBlog={createBlog}></BlogForm>);

    const titleInput = screen.getByPlaceholderText("Write title");
    const authorInput = screen.getByPlaceholderText("Write author name");
    const contentInput = screen.getByPlaceholderText("Write content");
    const urlInput = screen.getByPlaceholderText("Write url");
    fireEvent.change(titleInput, {
      target: { value: "Multivariable calculus" },
    });
    fireEvent.change(authorInput, { target: { value: "Rohit" } });
    fireEvent.change(contentInput, { target: { value: "nice" } });
    fireEvent.change(urlInput, { target: { value: "www.com" } });

    const user = userEvent.setup();
    const button = screen.getByText("save");
    await user.click(button);
    expect(createBlog).toHaveBeenCalledWith({
      title: "Multivariable calculus",
      author: "Rohit",
      content: "nice",
      url: "www.com",
    });
  });
});

describe("<Togglable>", async () => {
  let container;
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="Show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });
  test("Renders the Togglable component", async () => {
    await screen.findAllByText("togglable content");
  });
  test("children are not displayed in starting", async () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });
  test("children are displayed when show button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("Show...");
    await user.click(button);
    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
  test("children can be hided by clicking cancel button", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("Show...");
    await user.click(button);

    const closeButton = screen.getByText("cancel");
    await user.click(closeButton);

    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });
  test("note added changes the parent state", async () => {
    const createNote = vi.fn();
    const user = userEvent.setup();
    render(<NoteForm createNote={createNote}></NoteForm>);

    const input = screen.getByPlaceholderText("Write a note");
    const sendButton = screen.getByText("save");

    await user.type(input, "Hello World");
    await user.click(sendButton);

    expect(createNote.mock.calls).toHaveLength(1);
    expect(createNote.mock.calls[0][0].content).toBe("Hello World");
    console.log(createNote.mock.calls);
  });
});
test("clicking the button calls the evnt handler once", async () => {
  const note = {
    important: true,
    content: "Hello India",
  };
  const mockHandler = vi.fn();
  render(<Note note={note} toggleImportance={mockHandler}></Note>);
  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);
  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("renders content", () => {
  const note = {
    important: true,
    content: "Hello world",
  };
  render(<Note note={note} />);
  const element = screen.getByText("Hello world", { exact: false });

  expect(element).toBeDefined();
});

// test("renders blog", () => {
//   const note = {
//     important: true,
//     content: "Hello world",
//   };
//   const { container } = render(<Note note={note} />);
//   screen.debug();
//   const div = container.querySelector(".note");
//   expect(div).toHaveTextContent("world");
// });
