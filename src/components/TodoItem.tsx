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
    <li className="my-1">
        <input 
            id={id} 
            type="checkbox" 
            className="cursor-pointer peer mx-2"
            defaultChecked={complete}
            onChange={e => toggleTodo(id, e.target.checked)}/>
        <label htmlFor={id} className="cursor-pointer peer-checked:line-through 
        peer-checked:slate-500">
            {title}
            <div>
                Will take {duration} min to start
            </div>
        </label>
        <button 
            className='border border-slate-300 text-slate-300 px-2 py-1
            rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
            onClick={() => deleteItem(id)}>
                Delete Item
        </button>
    </li>
    )
}