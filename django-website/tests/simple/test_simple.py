from django.test import TestCase


class SimpleTestCase(TestCase):
    def setUp(self):
        pass

    def test_simple_empty_test(self):
        """
        This test is used as a placeholder for a quick CI integration
        """
        self.assertEqual(1, 1)
