context("Adding comments", () => {
	it("should add a new comment in flow mode", () => {
		cy.visit(`/index.html#/base/willow`);
		cy.get(".wx-messages .wx-flow").should("have.length", 3);
		cy.get(".wx-messages .wx-bubble").should("not.exist");

		const newComment = "This is a new test comment";
		cy.addComment(newComment);
		cy.get(".wx-messages .wx-flow").should("have.length", 4);

		cy.get(".wx-messages .wx-flow")
			.last()
			.should("contain.text", newComment)
			.should("contain.text", "Alice Smith")
			.should("be.visible");
	});

	it("should add a new comment in bubble mode", () => {
		cy.visit(`/index.html#/base/willow`);
		cy.get(".wx-segmented button").contains("Bubbles").click();
		cy.get(".wx-messages .wx-bubble").should("have.length", 3);
		cy.get(".wx-messages .wx-flow").should("not.exist");

		const newComment = "This is a bubble comment";
		cy.addComment(newComment);
		cy.get(".wx-messages .wx-bubble").should("have.length", 4);

		cy.get(".wx-messages .wx-bubble")
			.last()
			.should("contain.text", newComment)
			.should("contain.text", "Alice Smith")
			.should("be.visible");
	});
});
