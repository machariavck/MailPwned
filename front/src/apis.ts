
// submit handler
const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();

	const res = await fetch(`http://localhost:5000/breaches?query={user(email:"${e.currentTarget.email.value}"){Name}}`)
	const { data: { user }} = await res.json()
	// console.log(user)
	const [users] = user;
};


export { submitHandler as submit };