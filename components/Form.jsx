import Link from "next/link"
function Form({ type, post, setPost, submitting, handleSubmit }) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type}</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompt with the world.
      </p>

      <form className="w-full max-w-2xl mt-10 flex flex-col gap-7 glassmorphism" onSubmit={handleSubmit}>
        <label>
          <span className="font-satosh font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea
            className="form_textarea"
            placeholder="Write your prompt here"
            value={post.prompt}
            onChange={e => setPost({ ...post, prompt: e.target.value })} />
        </label>

        <label>
          <span className="font-satosh font-semibold text-base text-gray-700">Tag <span className="font-normal">(#product , #webdev)</span>  </span>
          <input
            className="form_input"
            placeholder="Write your tag here"
            value={post.tag}
            onChange={e => setPost({ ...post, tag: e.target.value })} />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <button type="submit" disabled={submitting} className="px-3 py-1.5 text-sm bg-primary-orange rounded-full text-white ">
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

    </section>

  )
}

export default Form
