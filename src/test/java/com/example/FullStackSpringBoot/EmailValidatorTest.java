package com.example.FullStackSpringBoot;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

class EmailValidatorTest {

    private final EmailValidator underTest = new EmailValidator();

    @Test
    void itShouldValidateCorrectEmail() {
        assertThat(underTest.test("steinert-michael@mail.de")).isTrue();
    }

    @Test
    void itShouldValidateAnIncorrectEmail() {
        assertThat(underTest.test("steinert-michael@mail")).isFalse();
    }
}