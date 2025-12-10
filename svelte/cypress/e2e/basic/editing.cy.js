context("Editing comments", () => {
	it("should edit a comment", () => {
		cy.visit(`/index.html#/base/willow`);

		cy.get(".wx-messages .wx-flow").first().find(".wx-menu-icon").click();
		cy.get('[data-id="edit-comment"]').click();

		const editedComment = "This comment has been edited";
		cy.get(".wx-messages .wx-flow")
			.first()
			.find("textarea")
			.clear()
			.type(editedComment);
		cy.get(".wx-messages .wx-flow")
			.first()
			.find("button.wx-button.wx-primary")
			.click();

		cy.get(".wx-messages .wx-flow")
			.first()
			.should("contain", editedComment);

		cy.shot(`edit-comment-willow`, { area: ".content" });
	});
});
