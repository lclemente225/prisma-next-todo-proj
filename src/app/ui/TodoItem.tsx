'use client'
type TodoItemProps = {
    id: string
    title: string
    duration: number
    complete: boolean
    toggleTodo: (id: string, complete: boolean) => void
    deleteItem: (id: string) => void
}

export default function TodoItem({id, title, duration, complete, toggleTodo, deleteItem}: TodoItemProps){
    return (
    <li className="w-4/5 my-3 p-5 grid border grid-cols-3 grid-rows-1 ">
            
        <input 
            id={id} 
            type="checkbox" 
            className="cursor-pointer peer mx-2 h-5 col-span-1"
            defaultChecked={complete}
            onChange={e => toggleTodo(id, e.target.checked)}/>

        <label htmlFor={id} className="cursor-pointer peer-checked:line-through 
        peer-checked:slate-500 col-span-1">
            {title}
        </label>

        <span>
            Will take <span className="text-green-500 font-bold text-xl">{duration}</span> min to start
        </span>

        <button 
            className='border border-slate-300 text-slate-300 px-2 py-1
            rounded hover:bg-red-900 focus-within:bg-slate-700 outline-none col-start-3'
            onClick={() => deleteItem(id)}>
                Delete Item
        </button>
    </li>
    )
}