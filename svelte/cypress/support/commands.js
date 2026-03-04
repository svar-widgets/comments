import { setID } from "@svar-ui/lib-dom";

Cypress.Commands.add("shot", (...args) => {
	// eslint-disable-next-line cypress/no-unnecessary-waiting
	cy.wait(100);

	const name = args.filter(a => typeof a !== "object").join("-");
	const conf =
		typeof args[args.length - 1] === "object" ? args[args.length - 1] : {};
	const sconf = { ...conf, overwrite: true };

	if (conf.area) cy.get(conf.area).screenshot(name, sconf);
	else cy.screenshot(name, sconf);
});

Cypress.Commands.add("addComment", (text, selector = ".wx-comments-list") => {
	cy.get(`${selector} textarea`).type(text);
	cy.get(`${selector} button`).contains("Add").click();
});

Cypress.Commands.add(
	"wxC",
	{
		prevSubject: "optional",
	},
	(subject, type, id) => {
		subject = subject ? cy.wrap(subject) : cy;
		switch (type) {
			case "menu-item":
				return subject.get(
					`.wx-menu .wx-option[data-id="${setID(id)}"]`
				);

			default:
				throw `not supported arguments for wxT: ${type}, ${id}`;
		}
	}
);
